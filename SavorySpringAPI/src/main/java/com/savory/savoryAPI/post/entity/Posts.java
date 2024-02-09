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


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Builder
@AllArgsConstructor
@Table(name = "POSTS")
public class Posts {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "ID", nullable = false)
   @Builder.Default
   Integer id = 0;

   @Column(name = "USER_ID", nullable = false)
   @Builder.Default
   Integer userID = 0;

   @Column(name = "HEADLINE", nullable = false)
   @Builder.Default
   String headline = "";

   @Column(name = "INGREDIENTS", nullable = false)
   @Builder.Default
   String ingredients = "";

   @Column(name = "RECIPE", nullable = false)
   @Builder.Default
   String recipe = "";

   @Column(name = "PICTURE_URL", nullable = false)
   @Builder.Default
   String pictureURL = "";

   @Column(name = "TAG1", nullable = false)
   @Builder.Default
   String tag1 = "";

   @Column(name = "TAG2", nullable = false)
   @Builder.Default
   String tag2 = "";

   @Column(name = "DATE", nullable = false)
   @Builder.Default
   String date = "";
}