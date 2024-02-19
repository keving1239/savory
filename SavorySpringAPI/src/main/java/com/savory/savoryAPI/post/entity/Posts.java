// package com.credera.hero.entity;


// import com.credera.power.entity.SuperPower;
// import lombok.*;
// import org.hibernate.Hibernate;

// import javax.persistence.*;
// import java.util.List;
// import java.util.Objects;

// @Getter
// @Setter
// @ToString
// @RequiredArgsConstructor
// @Entity
// @Table(name = "SUPERHERO")
// public class SuperHero {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(name = "SUPERHERO_KEY", nullable = false)
//     Long key;

//     @Column(name = "ORIGIN_STORY", nullable = false)
//     String originStory;

//     @Column(name = "IMAGE_URL", nullable = false, length = 1024)
//     String imageUrl;

//     @Column(name = "NAME", nullable = false, length = 50)
//     String name;

//     @ManyToMany
//     @JoinTable(
//             name = "SUPERHERO_TO_SUPERPOWER",
//             joinColumns = @JoinColumn(name = "SUPERHERO_KEY"),
//             inverseJoinColumns = @JoinColumn(name = "SUPERPOWER_KEY"))
//     @ToString.Exclude
//     List<SuperPower> superPowers;

//     @Override
//     public boolean equals(Object o) {
//         if (this == o) return true;
//         if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
//         SuperHero superHero = (SuperHero) o;
//         return key != null && Objects.equals(key, superHero.key);
//     }

//     @Override
//     public int hashCode() {
//         return getClass().hashCode();
//     }
// }

package com.savory.savoryAPI.post.entity;


import com.savory.savoryAPI.person.entity.Person;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Builder
@AllArgsConstructor
@Table(name = "Posts")
public class Posts {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "postId", nullable = false)
   private int post_id;

   @Column(name = "userId", nullable = false)
   private int userID;

   @Column(name = "Headline", nullable = false)
   private String headline;

   @Column(name = "Ingredients", nullable = false)
   private String ingredients;

   @Column(name = "Recipe", nullable = false)
   private String recipe;

   @Column(name = "Img", nullable = false)
   private byte[] img;

   @Column(name = "Tags", nullable = false)
   private String tags;

//   @Column(name = "Tag2", nullable = false)
//   private String tag2;

   @Column(name = "PostDate", nullable = false)
   private String postdate;


}