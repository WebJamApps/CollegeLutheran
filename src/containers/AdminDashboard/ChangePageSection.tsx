import {
  SetStateAction, useContext, useEffect, useState,
} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ContentContext } from 'src/providers/Content.provider';
import { AuthContext } from 'src/providers/Auth.provider';
import { Button, Switch, FormControlLabel } from '@mui/material';
import forms from 'src/lib/forms';
import utils from './utils';

interface IcommentsEditorProps {
  comments: string | undefined, setComments: (arg0: string) => void
}
export function CommentsEditor(
  props: IcommentsEditorProps,
) {
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
      onSubmit={(e) => { e.preventDefault(); }}
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
    enabled,
  }: {
    title: string,
    getContent: () => Promise<void>,
    comments?: string,
    buttonName: string,
    type: 'habitatPageContent' | 'homePageContent' | 'stewardshipPageContent' | 'youthPageContent' | 'eventPageContent',
    enabled?: boolean,
  },
) {
  const { auth } = useContext(AuthContext);
  return (
    <div style={{ marginTop: '10px' }}>
      <Button
        size="small"
        variant="contained"
        type="button"
        id="c-h"
        onClick={() => utils.putAPI({
          title, comments, type, enabled,
        }, auth, getContent, true)}
      >
        {buttonName}
      </Button>
    </div>
  );
}

export interface IchangePageSectionProps {
  pageType: 'habitatPage' | 'stewardshipPage' | 'homePage' | 'youthPage' | 'eventPage',
  formTitle: string, withInput?: boolean, withToggle?: boolean, inputLabel?: string,
}
export function ChangePageSection(props: IchangePageSectionProps) {
  const {
    pageType, formTitle, withInput, withToggle, inputLabel,
  } = props;
  const { content, getContent, getEventPage } = useContext(ContentContext);
  const pageDoc = content[pageType];
  const [comments, setComments] = useState(pageDoc?.comments ?? '');
  const [title, setTitle] = useState(pageDoc?.title ?? '');
  const [enabled, setEnabled] = useState<boolean>(pageDoc?.enabled === true);

  useEffect(() => {
    const doc = content[pageType];
    setComments(doc?.comments ?? '');
    setTitle(doc?.title ?? '');
    setEnabled(doc?.enabled === true);
  }, [content, pageType]);

  const label = inputLabel || 'Title';
  const inputParams = {
    type: 'text',
    label,
    isRequired: false,
    onChange: (evt: { target: { value: SetStateAction<string>; }; }) => {
      const { target: { value } } = evt;
      setTitle(value);
      return value;
    },
    value: title,
    width: '90%',
  };
  const refreshFn = pageType === 'eventPage' ? (getEventPage || getContent) : getContent;

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
          {withToggle ? (
            <FormControlLabel
              control={<Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />}
              label={enabled ? 'Page visible (on)' : 'Page hidden (off)'}
            />
          ) : null}
          <p style={{ fontSize: '12pt', marginTop: '12px', marginBottom: '2px' }}>Content</p>
          <CommentsEditor comments={comments} setComments={setComments} />
          <UpdateButton
            getContent={refreshFn}
            title={title}
            comments={comments}
            type={`${pageType}Content`}
            buttonName={`Update ${formTitle}`}
            enabled={withToggle ? enabled : undefined}
          />
        </form>
      </div>
    </div>
  );
}
