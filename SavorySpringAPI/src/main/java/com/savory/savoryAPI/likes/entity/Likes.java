package com.savory.savoryAPI.likes.entity;

import lombok.*;
import jakarta.persistence.*;


@Getter
@Setter
@ToString
@EqualsAndHashCode
@RequiredArgsConstructor
@SuppressWarnings("unused")
@Entity
@Table(name = "LIKES")
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    int id;

    @JoinColumn(name = "userId", nullable = false)
    int userId;

    @JoinColumn(name = "postId", nullable = false)
    int postId;

}