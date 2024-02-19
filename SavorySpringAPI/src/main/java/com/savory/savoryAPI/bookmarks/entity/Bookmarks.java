package com.savory.savoryAPI.bookmarks.entity;


import lombok.*;

import jakarta.persistence.*;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "BOOKMARKS")
public class Bookmarks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    int id;

    @JoinColumn(name = "userId", nullable = false)
    int userId;

    @JoinColumn(name = "postId", nullable = false)
    int postId;


    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}