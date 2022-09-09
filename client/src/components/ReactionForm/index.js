import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';

const ReactionForm = ({ thoughtId }) => {
  const [reactionBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addReaction, { error }] = useMutation(ADD_REACTION);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addReaction({
        variables: { reactionBody, thoughtId },
      });

      // clear form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
      window.location.reload();
    }
  };

  return (
    <div>
      <form 
        class='form'
        onSubmit={handleFormSubmit}>
        <textarea
          placeholder="what are your thoughts on this place ?"
          value={reactionBody}
          className="form-input"
          onChange={handleChange}
        ></textarea>
        <button className="post-btn" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default ReactionForm;
