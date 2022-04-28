<div class="page-wrapper">
    <?php get_header(); ?>

    <div style="padding-top: 89px;">

        <div class="top-banner">
            <div class="top-catch">
                <h2>Software Change the World.</h2>
                <img class="top-image" src="<?php echo get_template_directory_uri(); ?>/images/header-image.png" />
            </div>

            <div class="banner-overlay">
                <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#ffffff" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
        </div>

        <!--Recent-->
        <div class="section">
            <h1 class="section-title">最近の更新</h1>

            <?php
            $args = array("posts_per_page" => 5, "orderby" => "date");
            $posts_array = get_posts($args);
            ?>
            <?php foreach ($posts_array as $post) : ?>
                <hr>

                <div class="post">
                    <a href="<?php the_permalink(); ?>" class="post-title">
                        <?php the_title(); ?>
                    </a>

                    <p class="post-date p-no-padding">
                        <?php echo get_the_date(); ?>
                    </p>
                </div>
            <?php endforeach; ?>
        </div>

        <div class="section">
            <h1 class="section-title">注目のアプリ</h1>

            <?php echo do_shortcode('[wpb_childpages]'); ?>
        </div>

    </div>

    <?php get_footer(); ?>
</div>