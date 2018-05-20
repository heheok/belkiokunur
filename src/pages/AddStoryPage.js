import React, { Component } from 'react';
import Editor from 'react-medium-editor';
import styled from 'styled-components';
import axios from 'axios';
import uuidv1 from 'uuid/v1';
import getSlug from 'speakingurl';
import striptags from 'striptags';
import { media } from '../utils/styles';

class AddStoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      title: ''
    };
  }

  handleBodyChange = (text, medium) => {
    this.setState({ text: text });
  };
  handleTitleChange = title => {
    this.setState({ title: title });
  };

  componentDidMount() {
    this.autosaveTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  autosaveTimer = () => {
    console.log('start');
    this.timer = setInterval(this.autoSave, 10000);
  };

  autoSave = () => {
    const { articleId: originalArticleId, title, text } = this.state;
    const currentDate = new Date();
    if (title !== '' || text !== '') {
      const strippedTitle = striptags(title);
      const urlSlug = getSlug(strippedTitle).substr(0, 30);
      if (originalArticleId) {
        axios
          .patch(`http://localhost:8080/articles/${originalArticleId}`, {
            title: strippedTitle,
            slug: urlSlug,
            text: text
          })
          .then(({ data }) => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        axios
          .post('http://localhost:8080/articles', {
            id: uuidv1(),
            authorId: 1,
            date: `${currentDate.getDay()}.${parseInt(currentDate.getMonth(), 10) + 1}.${currentDate.getFullYear()}`,
            genreId: 1,
            title: strippedTitle,
            slug: urlSlug,
            text: text,
            published: false
          })
          .then(({ data: { id } }) => {
            this.setState({ articleId: id });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };

  render() {
    return (
      <StEditorPane>
        <StEditorWrapper>
          <StEditorTitle
            text={this.state.title}
            onChange={this.handleTitleChange}
            options={{
              toolbar: false,
              placeholder: {
                text: 'Başlık',
                hideOnClick: false
              }
            }}
          />
          <StEditorBody
            text={this.state.text}
            onChange={this.handleBodyChange}
            options={{
              placeholder: {
                text: 'Hikayeni Anlat...',
                hideOnClick: false
              },
              anchor: {
                placeholderText: 'Link vermek istediğiniz URL',
                targetCheckbox: false,
                targetCheckboxText: 'Open in new window'
              }
            }}
          />
        </StEditorWrapper>
      </StEditorPane>
    );
  }
}

const StEditorPane = styled.div`
  width:100%;
  padding:0px 10px
  display:flex;
  justify-content:center;
`;
const StEditorWrapper = styled.div`
  margin-top:30px;
  width:700px;
  ${media.md`
    width:100%;
  `};
`;
const StEditorBody = styled(Editor)`
  border-left:1px solid #dedede;
  padding-left:20px;

  &:focus{
    outline:none;
  }

  & b{
    font-weight:600;
  }
  & p {
    margin:0;
    padding:0;
  } 
`;
const StEditorTitle = styled(Editor)`
  border-left:1px solid #dedede;
  padding-left:20px;
  font-weight:600;
  font-size:42px;
  margin-bottom:20px;
  &:focus{
    outline:none;
  }
  & p {
    margin:0;
    padding:0;
  } 
`;

export default AddStoryPage;
