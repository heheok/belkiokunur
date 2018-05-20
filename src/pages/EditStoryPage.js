import React, { Component } from 'react';
import Editor from 'react-medium-editor';
import styled from 'styled-components';
import axios from 'axios';
import uuidv1 from 'uuid/v1';
import getSlug from 'speakingurl';
import striptags from 'striptags';
import { media } from '../utils/styles';

class EditStoryPage extends Component {
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
    this.setState({ title: striptags(title) });
  };

  componentDidMount() {
    const { articleSlug } = this.props.match.params;
    const params = {
      slug: articleSlug
    };
    axios
      .get('http://localhost:8080/articles/', { params })
      .then(({ data }) => {
        this.setState({
          title: data[0].title,
          text: data[0].text,
          articleId: data[0].id,
          loading: false,
          hasError: false
        });
      })
      .catch(error => {
        this.setState({
          hasError: true,
          loading: false
        });
      });

    this.autosaveTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  autosaveTimer = () => {
    console.log('start');
    this.timer = setInterval(this.autoSave, 10000);
  };

  addStory = () => {
    const { title, text } = this.state;
    const currentDate = new Date();
    axios
      .post('http://localhost:8080/articles', {
        id: uuidv1(),
        authorId: 1,
        date: `${parseInt(currentDate.getDay(), 10) + 1}.${parseInt(currentDate.getMonth(), 10) + 1}.${currentDate.getFullYear()}`,
        genreId: 1,
        title: title,
        slug: getSlug(title).substr(0, 30),
        text: text,
        published: true
      })
      .then(({ data: { id } }) => {
        this.setState({ articleId: id });
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateStory = () => {
    const { articleId, title, text } = this.state;
    axios
      .patch(`http://localhost:8080/articles/${articleId}`, {
        title: title,
        slug: getSlug(title).substr(0, 30),
        text: text
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  autoSave = () => {
    const { articleId, title, text } = this.state;
    if (title !== '' || text !== '') {
      if (articleId) {
        this.updateStory();
      } else {
        this.addStory();
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
              placeholder: false
            }}
          />
          <StEditorBody
            text={this.state.text}
            onChange={this.handleBodyChange}
            options={{
              placeholder: false,
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

  font-size:21px;
  line-height: 1.5;
  letter-spacing: -.003em;

  &:focus{
    outline:none;
  }

  & b{
    font-weight:600;
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

export default EditStoryPage;
