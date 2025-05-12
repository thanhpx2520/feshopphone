import moment from "moment";

function CommentItem({ comment }) {
  return (
    <div className="comment-item">
      <ul>
        <li>
          <b>{comment.full_name}</b>
        </li>
        <li>{moment(comment.createdAt).fromNow()}</li>
        <li>
          <p>{comment.body}</p>
        </li>
      </ul>
    </div>
  );
}

export default CommentItem;
