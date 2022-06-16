import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';
import ELCALogo from '../../components/elcaLogo';
import PicSlider from '../../components/PicSlider';

const pageName = 'habitatproject';
const images= [{_id:'5e7273f7349ad8000410f761', title:'CLC Fellowship' , url:'https://dl.dropboxusercontent.com/s/s1n4nxwc4pz3bml/CLC_Fellowship.png?dl=0', type:'habitat', comments:''}] //'showCaption' displays captions if needed'

const HabitatProjectContent = (): JSX.Element => (
  <div className="page-content">
    <Grid container>
      <Grid item xs={12} sm={6} md={4} style={{marginInline:'0', paddingInline:'20px'}}>
        <Paper elevation={0}>
          <h3 style={{ paddingBottom: '15px', paddingTop: '22px', textAlign:'center'}}>College Lutheran Habitat Project</h3>
          <p style={{textAlign: 'left'}}>
          College Lutheran Church has made a commitment of $50,000 to sponsor a home in the
          Roanoke Valley. This is the largest service project undertaken by the members of College
          Lutheran and we are delighted to be underway.
          <br></br>
          Here are some details:
          <ul>
            <li>
              This will be a rebuild project at 1004 Stewart Avenue, SE Roanoke.
            </li>
            <li>
              The existing structure will be gutted with hazardous material being mitigated before
              volunteers are on site.
            </li>
            <li>
              New construction will be added to the rear of the building.
            </li>
            <li>
              A family has yet to be confirmed for this home, but we expect a family will be
              designated in the coming weeks
            </li>
            <li>
              All level of construction skills will be needed. Workdays will probably be Wednesday
              and Saturday, but that may change. We typically work 8:00 – 2:00, but half-time
              participation is welcome.
            </li>
            <li>
              Lunch, water, tools are all provided.
            </li>
            <li>
              We plan to have workers on this site 2 days each week until it is completed
            </li>
            <li>
              We plan to have workers on this site 2 days each week until it is completed
            </li>
            <li>
              On each workday we will need 6-10 workers, plus a lunch crew and perhaps some
              videographers.
            </li>
          </ul>
          </p>
        </Paper>
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4}>
          <h3 style={{ paddingBottom: '15px', paddingTop: '22px', textAlign:'center'}}>Announcements</h3>
          <p style={{textAlign: 'center'}}>
            <strong>NO NEW ANNOUNCEMENTS YET</strong>
          </p>
      </Grid> */}
      <Grid item xs={12} sm={6} md={4} style={{paddingInline:'20px'}}>
          <h3 style={{ paddingBottom: '15px', paddingTop: '22px', textAlign:'center'}}>Volunteer Sign Ups</h3>
          <Paper elevation={0}>
            <div style={{maxWidth:'500px'}}>
              <p>
                There will be a total of 42 days for volunteering to support the habitat build. For each workday we need to have the following volunteers:
              </p>
                <ul>
                  <li>
                    10 people for construction work
                  </li>
                  <li>
                    4 people to supply lunch/water
                  </li>
                  <li>
                    1-2 videographers
                  </li>
                </ul>
                <p>Please use the following <a href='https://docs.google.com/spreadsheets/d/1XBMf5NN7Mo5z6I7F24nmNwbBW1jOH0fJE3Ij-jqcEPk/edit?usp=sharing' target='_blank'>spreadsheet</a> to sign up for a 3 or 6 hour time block.
              </p>
            </div>
          </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} style={{paddingInline:'20px'}}>
        <Paper elevation={0}>
          <h3 style={{ paddingBottom: '15px', paddingTop: '22px', textAlign:'center'}}>Progression Slideshow</h3>
          <PicSlider data={images}/>
          <p style={{textAlign:'center'}}>For progression videos, please checkout our <a href='https://www.youtube.com/channel/UCOra1rXiO-BHzMDNlLd9hFQ/videos' target='_blank' rel="noopener noreferrer">YouTube channel</a>.</p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} style={{paddingInline:'20px'}}>
          <h3 style={{ paddingBottom: '15px', paddingTop: '22px', textAlign:'center'}}>Construction Team</h3>
          <Paper elevation={0}>
            <div>
              <p>
                <strong>TEAM LEADERS:</strong>
                <br/>
                <br/>
                Matt Gart, Mike Preston, and Skip Zubrod
              </p>
              <div>
                <p><strong>RESPONSIBILITIES:</strong></p>
                <ul>
                  <li>
                    Schedule workdays
                  </li>
                  <li>
                    Schedule Workers
                  </li>
                  <li>
                    Coordinate with site supervisor
                  </li>
                </ul>
              </div>
            </div>
          </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} style={{paddingInline:'20px'}}>
          <h3 style={{ paddingBottom: '15px', paddingTop: '22px', textAlign:'center'}}>Support Team</h3>
          <Paper elevation={0}>
            <div>
              <p>
                <strong>TEAM LEADERS:</strong>
                <br/>
                <br/>
                Lisa Yagle, Kay Westermann, and Karen Zubrod
                <br/>
                <br/>
                <strong>Sunday Updaters:</strong>
                <br/>
                <br/>
                Roger Holtman, Anita Ungs, and Paul Brummer
                <br/>
                <br/>
                <strong>Publicity:</strong>
                <br/>
                <br/>
                Gary Lautenschlager
                <br/>
                <br/>
                <strong>Web Page:</strong>
                <br/>
                <br/>
                Josh Sherman
              </p>
              <div>
                <p><strong>RESPONSIBILITIES:</strong></p>
                <ul>
                  <li>
                    Make lunches
                  </li>
                  <li>
                    Provide water
                  </li>
                  <li>
                    Provide safety
                  </li>
                </ul>
              </div>
            </div>
          </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} style={{paddingInline:'20px'}}>
          <h3 style={{ paddingBottom: '15px', paddingTop: '22px', textAlign:'center'}}>Construction Team</h3>
          <Paper elevation={0}>
            <div>
              <p>
                <strong>TEAM LEADERS:</strong>
                <br/>
                <br/>
                Bob and Lu Ann Yates, Ellen Holtman, and Debi Talin
              </p>
              <div>
                <p><strong>RESPONSIBILITIES:</strong></p>
                <ul>
                  <li>
                    Connect with the family
                  </li>
                  <li>
                    Provide move-in needs
                  </li>
                  <li>
                    Introduce family to CLC
                  </li>
                </ul>
              </div>
            </div>
          </Paper>
      </Grid>
    </Grid>
    <ELCALogo/>
  </div>
);
export default HabitatProjectContent;
