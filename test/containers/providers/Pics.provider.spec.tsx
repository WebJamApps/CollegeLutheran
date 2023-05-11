// import { render, screen } from '@testing-library/react';
// import renderer from 'react-test-renderer';
// import {
//   PictureProvider, populatePictures, setPicturesDef,
// } from 'src/providers/Pics.provider';
// import '@testing-library/jest-dom';
// import axios from 'axios';

// jest.mock('axios');

// describe('Pics provider', () => {
//   it('renders the PictureProvider', () => {
//     const pictureProvider = renderer.create(<PictureProvider><div /></PictureProvider>).toJSON();
//     expect(pictureProvider).toBeDefined();
//   });
//   it('sets pictures with useEffect', async () => {
//     render(<PictureProvider><div id="test-div">Test Div Here</div></PictureProvider>);
//     expect(screen.getByText('Test Div Here')).toBeInTheDocument();
//   });
//   it('setPicturesDef', () => {
//     const IpictureTypes: any = {};
//     expect(setPicturesDef(IpictureTypes)).toBeUndefined();
//   });
//   it('populates pictures', async () => {
//     const setPictures = jest.fn();
//     const resp = {
//       data: {
//         musicPics:
//        { title: '', type: '', _id: '' },
//         familyPics: { title: '', type: '', _id: '' },
//         habitatPics: { title: '', type: '', _id: '' },
//         youthPics: { title: '', type: '', _id: '' },
//         otherPics: { title: '', type: '', _id: '' },
//       },
//     };
//     (axios.get as jest.Mock).mockImplementation(() => Promise.resolve(resp));
//     await populatePictures(setPictures);
//     expect(setPictures).toHaveBeenCalled();
//   });
// });
