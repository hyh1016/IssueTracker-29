import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { POST_LABEL } from '../../reducer/label';
import { LabelContext } from '../common/context';
import LabelItem from '../common/labelItem';

const getRandomColor = () => {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

const LabelCreate = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(getRandomColor());
  const {labelDispatch} = useContext(LabelContext);

  const submitLabel = () => {
    if (name === "") {
      return;
    }

    if (!color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      return;
    }
    labelDispatch({type: POST_LABEL, payload: {name, description, color}});
    props.setIsCreating(false);
  }

  return (
    <div>
      <LabelItem label={{name: "Label preview", description, color}}>Label Preview</LabelItem>
      <label>
        Label name
        <input onChange={(e) => {setName(e.target.value)}}/>
      </label>
      <label>
        Description
        <input onChange={(e) => {setDescription(e.target.value)}} />
      </label>
      <label>
        Color
      </label>
      <button>Random</button>
      <input onChange={(e) => {setColor(e.target.value)}} value={color}/>
      <button onClick={() => props.setIsCreating(false)}>Cancel</button>
      <button onClick={() => {submitLabel();}}>Create label</button>
    </div>
  )
}

export default LabelCreate;