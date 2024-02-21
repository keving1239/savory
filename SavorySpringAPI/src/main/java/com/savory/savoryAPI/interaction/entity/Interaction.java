package com.savory.savoryAPI.interaction.entity;

import lombok.*;
import jakarta.persistence.*;


@Getter
@Setter
@ToString
@EqualsAndHashCode
@RequiredArgsConstructor
@SuppressWarnings("unused")
@Entity
@Table(name = "Interactions")
public class Interaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    int id;

    @JoinColumn(name = "userId", nullable = false)
    int userId;

    @JoinColumn(name = "postId", nullable = false)
    int postId;

    @Column(name = "liked", nullable = false)
    boolean isLiked;

    @Column(name = "bookmarked", nullable = false)
    boolean isBookmarked;
}