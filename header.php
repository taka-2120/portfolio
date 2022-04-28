<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title><?php echo get_bloginfo("name"); ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#675afc">
    <link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500&display=swap" rel="stylesheet">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri(); ?>/images/favicon/icon-16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri(); ?>/images/favicon/icon-32.png">
    <link rel="icon" type="image/png"  sizes="48x48" href="<?php echo get_template_directory_uri(); ?>/images/favicon/icon-48.png">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/images/favicon/icon-180.png">

    <?php wp_enqueue_script('jquery'); ?>
    <script src="https://kit.fontawesome.com/50b2d34bdc.js" crossorigin="anonymous"></script>
    <script>
        var directory_uri = "<?php echo get_template_directory_uri(); ?>";
    </script>
    <?php wp_head(); ?>
</head>

<body>
    <header>
        <div class="header-background">
            <h1><a class="header-title" href="https://iapp.devel.jp/"><?php echo get_bloginfo("name"); ?></a></h1>
        </div>
    </header>