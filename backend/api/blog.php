<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once('../config/database.php');

try {
    $stmt = $pdo->query("
        SELECT * FROM blog_posts 
        ORDER BY published_at DESC
    ");
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Transform image paths to full URLs
    foreach ($posts as &$post) {
        $post['thumbnail_url'] = 'http://localhost/mahalaxmi/app/backend/uploads/blog/' . $post['thumbnail'];

        // Calculate read time if not set
        if (!$post['read_time']) {
            $word_count = str_word_count(strip_tags($post['content']));
            $post['read_time'] = ceil($word_count / 200); // Assuming 200 words per minute
        }
    }

    echo json_encode(['success' => true, 'data' => $posts]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>