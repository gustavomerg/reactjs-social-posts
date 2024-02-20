import { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";
import { Trash, ThumbsUp } from "@phosphor-icons/react";

interface CommentProps {
  content: string;
  onDeleteComment: (commentToDelete: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {

  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment () {
    onDeleteComment(content)
  }

  function handleLikeComment () {
/*     const newLikeCount = (likeCount + 1)
    setLikeCount(newLikeCount)  */

    setLikeCount((state) => {
      return state + 1
    })

  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/49318844?v=4" alt="" />

      <div className={styles.commentBox}>
        
        <div className={styles.commentContent}>
          <header>
            
            <div className={styles.authorAndTime}>
              <strong>Gustavo Merg</strong>
              <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:30">
                Há 1h
              </time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>

          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

/* 
  <button onClick={handleLikeComment}>
    <ThumbsUp size={20} />
    Aplaudir <span>{likeCount}</span>
  </button>

  handleLikeComment
    * chamada da função
  
  handleLikeComment()
    * execução imediata da função

  Logo

  () => handleLikeComment()
    * Chamada da funcao
*/