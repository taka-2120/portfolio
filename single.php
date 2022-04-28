<div class="page-wrapper">
    <?php get_header(); ?>

    <div class="outer">
        <div class="single-content">
            <h1 class="single-title">
                <?php the_title(); ?>
            </h1>
            <?php echo the_content(); ?>
        </div>
    </div>

    <?php get_footer(); ?>
</div>