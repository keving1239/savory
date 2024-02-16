//// package com.credera.hero.util;
//
//// import com.credera.hero.dto.SuperHeroDto;
//// import com.credera.hero.entity.SuperHero;
//// import com.credera.power.util.SuperPowerUtil;
//
//// import java.util.stream.Collectors;
//
//// public class SuperHeroUtil {
//
////     public static SuperHeroDto buildSuperHeroDto(SuperHero superHero) {
////         return SuperHeroDto.builder()
////                 .imageUrl(superHero.getImageUrl())
////                 .name(superHero.getName())
////                 .key(superHero.getKey())
////                 .originStory(superHero.getOriginStory())
////                 .superPowers(superHero.getSuperPowers().stream().map(SuperPowerUtil::buildSuperPowerDto).collect(Collectors.toList()))
////                 .build();
////     }
//// }
//
package com.savory.savoryAPI.post.util;
import com.savory.savoryAPI.post.entity.Posts;
import com.savory.savoryAPI.post.dto.PostsDto;

// public class PostsDto {
//     int id;
//     int userID;
//     string headline;
//     List<String>ingredients;
//     List<String>recipe;
//     String pictureURL;
//     String tag1;
//     String tag2;
//     String date;


// }

public class PostsUtil
{
   public static PostsDto buildPostDto(Posts post)
   {
       return PostsDto.builder()
       .post_id(post.getPost_id())
       .userID(post.getUserID())
       .headline(post.getHeadline())
       .ingredients(post.getIngredients())
       .recipe(post.getRecipe())
       .img(post.getImg())
       .tags(post.getTags())
       .build();
   }
}