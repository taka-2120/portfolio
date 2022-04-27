<div class="page-wrapper">
    <?php get_header(); ?>

    <div class="outer">
        <h1 class="single-title">
            <?php the_title(); ?>
        </h1>

        <?php if (has_post_thumbnail()) : ?>
            <div class="single_thumbnail">
                <img src="<?php the_post_thumbnail_url('large'); ?>">
            </div>
        <?php endif; ?>

        <div class="single-content">
            <?php echo the_content(); ?>
        </div>
    </div>

    <?php get_footer(); ?>
</div>