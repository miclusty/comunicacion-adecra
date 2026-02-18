#!/usr/bin/env php
<?php
/**
 * Script para exportar contenido de WordPress a Markdown
 * Uso: php export-wp.php
 */

$mysqli = new mysqli('127.0.0.1', 'comunicacion', '_c(uZ876wa4rBjGX', 'comunicacion', 8889);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Directorio de salida
$outputDir = __DIR__ . '/src/content';
$imagesDir = __DIR__ . '/public/images';

// Crear directorios
@mkdir($outputDir . '/blog', 0777, true);
@mkdir($outputDir . '/events', 0777, true);
@mkdir($imagesDir, 0777, true);

echo "🚀 Exportando contenido de WordPress...\n\n";

// ============================================
// EXPORTAR POSTS (Noticias)
// ============================================
echo "📰 Exportando noticias...\n";

$posts = $mysqli->query("
    SELECT ID, post_title, post_name, post_content, post_date, post_status
    FROM wp_posts 
    WHERE post_type = 'post' AND post_status = 'publish'
    ORDER BY post_date DESC
");

$count = 0;
while ($post = $posts->fetch_assoc()) {
    // Limpiar contenido HTML básico
    $content = strip_tags($post['post_content'], '<p><br><strong><em><h1><h2><h3><h4><ul><ol><li><a><blockquote>');
    $content = html_entity_decode($content, ENT_QUOTES, 'UTF-8');
    
    // Crear slug
    $slug = sanitize_slug($post['post_name']);
    
    // Obtener imagen destacada
    $featuredImage = get_featured_image($mysqli, $post['ID']);
    
    // Obtener categorías
    $categories = get_post_categories($mysqli, $post['ID']);
    
    // Frontmatter
    $markdown = "---\n";
    $markdown .= 'title: "' . addslashes($post['post_title']) . "\"\n";
    $markdown .= 'date: ' . date('Y-m-d', strtotime($post['post_date'])) . "\n";
    if ($featuredImage) {
        $markdown .= 'image: "' . $featuredImage . "\"\n";
    }
    if (!empty($categories)) {
        $markdown .= 'categories: [' . implode(', ', array_map(fn($c) => '"' . $c . '"', $categories)) . "]\n";
    }
    $markdown .= "---\n\n";
    $markdown .= $content;
    
    // Guardar archivo
    file_put_contents($outputDir . '/blog/' . $slug . '.md', $markdown);
    $count++;
    
    echo "  ✓ {$post['post_title']}\n";
}

echo "   → {$count} noticias exportadas\n\n";

// ============================================
// EXPORTAR EVENTOS (MEC)
// ============================================
echo "📅 Exportando eventos...\n";

$events = $mysqli->query("
    SELECT ID, post_title, post_name, post_content, post_date, post_status
    FROM wp_posts 
    WHERE post_type = 'mec-events' AND post_status = 'publish'
    ORDER BY post_date DESC
");

$count = 0;
while ($event = $events->fetch_assoc()) {
    // Limpiar contenido
    $content = strip_tags($event['post_content'], '<p><br><strong><em><h1><h2><h3>');
    $content = html_entity_decode($content, ENT_QUOTES, 'UTF-8');
    
    $slug = sanitize_slug($event['post_name']);
    
    // Obtener imagen
    $featuredImage = get_featured_image($mysqli, $event['ID']);
    
    // Obtener metadata del evento
    $meta = get_event_meta($mysqli, $event['ID']);
    
    // Frontmatter
    $markdown = "---\n";
    $markdown .= 'title: "' . addslashes($event['post_title']) . "\"\n";
    $markdown .= 'date: ' . date('Y-m-d', strtotime($event['post_date'])) . "\n";
    if ($featuredImage) {
        $markdown .= 'image: "' . $featuredImage . "\"\n";
    }
    if (!empty($meta['location'])) {
        $markdown .= 'location: "' . addslashes($meta['location']) . "\"\n";
    }
    if (!empty($meta['start_date'])) {
        $markdown .= 'date: ' . $meta['start_date'] . "\n";
    }
    if (!empty($meta['end_date'])) {
        $markdown .= 'endDate: ' . $meta['end_date'] . "\"\n";
    }
    $markdown .= "---\n\n";
    $markdown .= $content;
    
    file_put_contents($outputDir . '/events/' . $slug . '.md', $markdown);
    $count++;
    
    echo "  ✓ {$event['post_title']}\n";
}

echo "   → {$count} eventos exportados\n\n";

// ============================================
// EXPORTAR PÁGINAS (Cursos, etc)
// ============================================
echo "📄 Exportando páginas...\n";

$pages = $mysqli->query("
    SELECT ID, post_title, post_name, post_content, post_date, post_status
    FROM wp_posts 
    WHERE post_type = 'page' AND post_status = 'publish'
    AND (post_title LIKE '%curso%' OR post_title LIKE '%diplomatura%' 
         OR post_title LIKE '%jornada%' OR post_title LIKE '%congreso%'
         OR post_name = 'cursos' OR post_name = 'eventos-cursos')
    ORDER BY post_title
");

$count = 0;
while ($page = $pages->fetch_assoc()) {
    $content = strip_tags($page['post_content'], '<p><br><strong><em><h1><h2><h3><ul><ol><li><a>');
    $content = html_entity_decode($content, ENT_QUOTES, 'UTF-8');
    
    $slug = sanitize_slug($page['post_name']);
    $featuredImage = get_featured_image($mysqli, $page['ID']);
    
    // Determinar tipo
    $type = 'post';
    if (stripos($page['post_title'], 'diplomatura') !== false) {
        $type = 'course';
    }
    
    $markdown = "---\n";
    $markdown .= 'title: "' . addslashes($page['post_title']) . "\"\n";
    $markdown .= 'date: ' . date('Y-m-d', strtotime($page['post_date'])) . "\n";
    $markdown .= 'type: ' . $type . "\n";
    if ($featuredImage) {
        $markdown .= 'image: "' . $featuredImage . "\"\n";
    }
    $markdown .= "---\n\n";
    $markdown .= $content;
    
    file_put_contents($outputDir . '/blog/' . $slug . '.md', $markdown);
    $count++;
    
    echo "  ✓ {$page['post_title']}\n";
}

echo "   → {$count} páginas exportadas\n\n";

echo "✅ Exportación completa!\n";
echo "📁 Archivos en: {$outputDir}\n";

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function sanitize_slug($slug) {
    $slug = sanitize_title($slug);
    // Eliminar números duplicados al final
    $slug = preg_replace('/-(\d+)$/', '', $slug);
    return $slug ?: 'untitled';
}

function sanitize_title($title) {
    $title = strtolower($title);
    $title = preg_replace('/[^a-z0-9\s-]/', '', $title);
    $title = preg_replace('/[\s-]+/', '-', $title);
    return trim($title, '-');
}

function get_featured_image($mysqli, $post_id) {
    $result = $mysqli->query("
        SELECT meta_value FROM wp_postmeta 
        WHERE post_id = $post_id AND meta_key = '_thumbnail_id'
        LIMIT 1
    ");
    
    if ($row = $result->fetch_assoc()) {
        $thumb_id = $row['meta_value'];
        $img = $mysqli->query("
            SELECT guid FROM wp_posts WHERE ID = $thumb_id LIMIT 1
        ");
        if ($imgRow = $img->fetch_assoc()) {
            // Extraer solo la ruta de la imagen
            $url = $imgRow['guid'];
            $filename = basename($url);
            return '/images/' . $filename;
        }
    }
    return null;
}

function get_post_categories($mysqli, $post_id) {
    $categories = [];
    $result = $mysqli->query("
        SELECT t.name FROM wp_terms t
        JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
        JOIN wp_term_relationships tr ON tr.term_taxonomy_id = tt.term_taxonomy_id
        WHERE tr.object_id = $post_id AND tt.taxonomy = 'category'
    ");
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row['name'];
    }
    return $categories;
}

function get_event_meta($mysqli, $event_id) {
    $meta = [];
    
    $result = $mysqli->query("
        SELECT meta_key, meta_value FROM wp_postmeta 
        WHERE post_id = $event_id 
        AND meta_key IN ('mec_start_date', 'mec_end_date', 'mec_location')
    ");
    
    while ($row = $result->fetch_assoc()) {
        if ($row['meta_key'] == 'mec_start_date') {
            $meta['start_date'] = date('Y-m-d', $row['meta_value']);
        } elseif ($row['meta_key'] == 'mec_end_date') {
            $meta['end_date'] = date('Y-m-d', $row['meta_value']);
        } elseif ($row['meta_key'] == 'mec_location') {
            $meta['location'] = $row['meta_value'];
        }
    }
    
    return $meta;
}
