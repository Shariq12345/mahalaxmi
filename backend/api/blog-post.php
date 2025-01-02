<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once('../config/database.php');

if (isset($_GET['slug'])) {
    try {
        $stmt = $pdo->prepare("
            SELECT * FROM blog_posts 
            WHERE slug = ?
            LIMIT 1
        ");
        $stmt->execute([$_GET['slug']]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($post) {
            // Transform image paths to full URLs
            $post['thumbnail_url'] = 'http://localhost/mahalaxmi/app/backend/uploads/blog/' . $post['thumbnail'];

            // Calculate read time if not set
            if (!$post['read_time']) {
                $word_count = str_word_count(strip_tags($post['content']));
                $post['read_time'] = ceil($word_count / 200);
            }

            echo json_encode(['success' => true, 'data' => $post]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Post not found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Slug is required']);
}
?>