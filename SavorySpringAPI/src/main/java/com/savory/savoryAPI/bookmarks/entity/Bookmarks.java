package com.savory.savoryAPI.bookmarks.entity;


import com.savory.savoryAPI.person.entity.Person;
import com.savory.savoryAPI.post.entity.Posts;
import lombok.*;
import org.hibernate.Hibernate;

import jakarta.persistence.*;

import java.util.Objects;

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