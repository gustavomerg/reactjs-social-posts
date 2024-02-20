import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment';
import styles from './Post.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post ({ post }: PostProps) {

  const [comments, setComments] =  useState([
    'Post muito banca, rapaz!'
  ])

  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR /* Aspas simples por volta para o date-fns não tentar converter, e sim usar o valor raiz */
  }) 

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    /* event.target = elemento que chama a funcao */
    /* event.target.comment = elemento que chama a funcao > elemento com name='comment' */

    /* const newCommentText = event.target.comment.value */

    setComments([...comments, newCommentText])

    setNewCommentText('')
  }

  function handleNewCommentChange (event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid (event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Este campo é obrigatório.')
  }

  function deleteComment (commentToDelete: string) {
    console.log(`Deletar comentário ${commentToDelete}`)

    const commentsWithoutDeletedOne = comments.filter( comment => {
      return comment !== commentToDelete /* true = retorna elemento - false = não retorna o elemento */
    })

    setComments(commentsWithoutDeletedOne)

  }

  const isNewCommentEmpty = newCommentText.length == 0;

  console.log('Nova renderizacao')

    return (
        <article className={styles.post}>

            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
                  {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
              {post.content.map(contentItem => {
                if (contentItem.type == 'paragraph') {
                  return <p key={contentItem.content}>{contentItem.content}</p>
                } else if (contentItem.type == 'link') {
                  return <p key={contentItem.content}><a href='#'>{contentItem.content}</a></p>
                }
              })}

            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                  name = 'comment'
                  placeholder='Deixe um comentário'
                  value={newCommentText}
                  onChange={handleNewCommentChange}
                  onInvalid={handleNewCommentInvalid}
                  required
                />
                
                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>
                      Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
              {comments.map(comment => {
                return ( 
                  <Comment
                    key={comment}
                    content={comment} 
                    onDeleteComment={deleteComment}
                  />
                )
              })}
            </div>

        </article>
    )
}