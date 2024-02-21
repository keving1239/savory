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
@Table(name = "Posts")
public class PostsUsername {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postId", nullable = false)
    private int postId;

    @Column(name = "userId", nullable = false)
    private int userID;

    @Column(name = "Headline", nullable = false)
    private String headline;

    @Column(name = "Ingredients", nullable = false)
    private String ingredients;

    @Column(name = "Recipe", nullable = false)
    private String recipe;

    @Column(name = "Img", nullable = false)
    private String img;

    @Column(name = "Tags", nullable = false)
    private String tags;

//   @Column(name = "Tag2", nullable = false)
//   private String tag2;

    @Column(name = "PostDate", nullable = false)
    private String postdate;

    @Column(name = "username", nullable = false)
    private String username;
}
