import { SetStateAction, useContext, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ContentContext } from 'src/providers/Content.provider';
import { AuthContext } from 'src/providers/Auth.provider';
import { Button } from '@mui/material';
import forms from 'src/lib/forms';
import utils from './utils';

interface IcommentsEditorProps {
  comments: string | undefined, setComments: (arg0: string) => void
}
export function CommentsEditor(
  props: IcommentsEditorProps,
): JSX.Element {
  const { setComments, comments } = props;
  return (
    <Editor
      apiKey={process.env.TINY_KEY}
      value={comments}
      init={{
        height: 500,
        menubar: 'insert tools',
        menu: { format: { title: 'Format', items: 'forecolor backcolor' } },
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
          'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
        ],
        toolbar:
            'undo redo | formatselect | bold italic backcolor forecolor |'
            + 'alignleft aligncenter alignright alignjustify |'
            + 'bullist numlist outdent indent | removeformat | help',
      }}
      onEditorChange={(newComments) => setComments(newComments)}
    />
  );
}

export function UpdateButton(
  {
    title = '',
    getContent,
    comments = '',
    buttonName,
    type,
  }: {
    title: string,
    getContent: () => Promise<void>,
    comments?: string,
    buttonName: string,
    type: 'habitatPageContent' | 'homePageContent' | 'stewardshipPageContent' | 'youthPageContent'
  },
): JSX.Element {
  const { auth } = useContext(AuthContext);
  return (
    <div style={{ marginTop: '10px' }}>
      <Button
        size="small"
        variant="contained"
        type="button"
        id="c-h"
        onClick={() => utils.putAPI({ title, comments, type }, auth, getContent)}
      >
        {buttonName}
      </Button>
    </div>
  );
}

export interface IchangePageSectionProps {
  pageType: 'habitatPage' | 'stewardshipPage' | 'homePage' | 'youthPage',
  formTitle: string, withInput?: boolean
}
export function ChangePageSection(props: IchangePageSectionProps) {
  const { pageType, formTitle, withInput } = props;
  const { content, getContent } = useContext(ContentContext);
  const [comments, setComments] = useState(content[pageType].comments);
  const [title, setTitle] = useState(content[pageType].title);
  const inputParams = {
    type: 'text',
    label: 'Title',
    isRequired: false,
    onChange: (evt: { target: { value: SetStateAction<string>; }; }) => {
      const { target: { value } } = evt;
      setTitle(value);
      return value;
    },
    value: title,
    width: '90%',
  };
  return (
    <div className="horiz-scroll">
      <div className="material-content elevation3" style={{ width: '850px', margin: '30px auto' }}>
        <h5>{formTitle}</h5>
        <form
          id={`create-${pageType}`}
          style={{
            textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
          }}
        >
          {withInput ? forms.makeInput(inputParams) : null}
          <p style={{ fontSize: '12pt', marginTop: '12px', marginBottom: '2px' }}>Content</p>
          <CommentsEditor comments={comments} setComments={setComments} />
          <UpdateButton
            getContent={getContent}
            title={title}
            comments={comments}
            type={`${pageType}Content`}
            buttonName={`Update ${formTitle}`}
          />
        </form>
      </div>
    </div>
  );
}
