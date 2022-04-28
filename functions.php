<?php
//SUPPORT THUMBNAIL FOR POSTS AND PAGES
add_theme_support( 'post-thumbnails' );

function get_current_link() {
    return (is_ssl() ? 'https' : 'http') . '://' . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
}


//LOAD APP LIST -- COMMON PART
function get_child($id, $array = []) {
    $args = array(
        'post_type'   => 'page',
        'post_status' => 'publish',
        'child_of' => $id
    );
    
    $children = get_pages($args); 
 
    $result = "";
    $count = 0;

    foreach ( $children as $child ) {
        $child_id = $child->ID;
        $child_slug = $child->post_name;

        if($array == []) {

            $url = get_permalink( $child_id );
    
            $thumb = get_the_post_thumbnail($child_id, array(1024, 1024));
    
            $title= $child->post_title;
            
            if ($count != 0) {
                $result .= '<hr>';
            }
    
            $result .= '<div class="applist-outer">
                            <div class="app-icon">' . $thumb . '</div>
                            <a href="' . $url . '" class="app-name">' . $title . '</a>
                        </div>';
            
            $count ++;
        } else {

            if (in_array($child_slug, $array['featured'])) {
                $url = get_permalink( $child_id );
        
                $thumb = get_the_post_thumbnail($child_id, array(1024, 1024));
        
                $title= $child->post_title;

                $result .= '<hr>';
        
                $result .= '<div class="applist-outer">
                                <div class="app-icon">' . $thumb . '</div>
                                <a href="' . $url . '" class="app-name">' . $title . '</a>
                            </div>';
                
                $count ++;
            }
        }
    }

    //"$id != 28": Same Method is Already Run in No.7(Prev.)
    if($count == 0 && ($id != 28 || get_current_link() != "https://iapp.devel.jp/")) {
        if(get_current_link() == "https://iapp.devel.jp/") {
            $result .= '<hr>';
        }
        $result .= '<h3 class="no-item">Sorry...<br>We have nothing to show :(</h3>';
    }
     
    return $result;
}


//LOAD APP LIST
function wpb_list_child_pages() {

    global $post;

    $result = '';

    if(get_current_link() == "https://iapp.devel.jp/") {
        //index.php - Featured Apps

        //LOAD JSON
        $url = get_template_directory_uri() . "/data/featured.json";
        $json = file_get_contents($url);
        $json = mb_convert_encoding($json, 'UTF-8');
    
        $array = json_decode($json, true); //true -> return as associative arrays
        
        $result .= get_child(7, $array);
        $result .= get_child(28, $array);

    } else {
        $result .= get_child($post->ID);
    }

    return $result;
}

add_shortcode('wpb_childpages', 'wpb_list_child_pages');