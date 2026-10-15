import { useTheme } from '@mui/material/styles';
import ELCALogo from 'src/components/elcaLogo';

const HistoryContent = () => {
  const theme = useTheme();
  const imageSrc = theme.palette.mode === 'dark' ? '/clc-building-dark.jpg' : '/clc-building-light.jpg';

  return (
    <div className="page-content">
      <div className="container-fluid">
        <p style={{ fontSize: '4pt', margin: '0' }}>&nbsp;</p>
        <div
          className="material-content elevation3"
          style={{
            maxWidth: '998px', margin: 'auto', minHeight: '74vh',
          }}
        >
          <h3 style={{ paddingTop: '12px', paddingBottom: '0px', marginBottom: '4px' }}>
            College Lutheran Church: From 1852 to Today
          </h3>
          <img
            className="history-picture"
            src={imageSrc}
            alt="College Lutheran Church building, aerial view at sunset"
          />
          <p>
            College Lutheran Church, a member of the national Evangelical Lutheran Church in America and the Virginia
            Synod, was organized on the campus of Roanoke College on December 18, 1852, by seven charter members. It has
            been located three places: the Roanoke College chapel, then the northwestern corner of College and Main, and
            its current location on South College Avenue.  The Main Street location was dedicated May 2, 1858.  The
            current building is now just past a century in age, having opened in 1922.
          </p>
          <p>
            The church is built from medina sandstone quarried locally.  It was constructed by J. R. Crouse of Greensboro,
            NC.  It is furnished in an arts and crafts neo-gothic design.  Its ten triple glass windows contain ten
            depictions of significant events in the life of Christ.  They were designed by the George Hardy Payne Studios
            of Patterson, NJ.  It has a seating capacity of 360.  The building was remodeled and enlarged following a
            2002 congregational decision.  A congregational architect member, Joseph Stoutamire, worked with the
            construction team to help adapt the building to the congregation’s needs.
          </p>
          <p>
            First served by temporary pastor, Christopher Baughman, the new Roanoke College president, David Bittle, then
            became College Church pastor until 1860 and again in 1861-1869.  Since mid-Twentieth Century, College Lutheran
            Church has been served by pastors: William Eisenberg, Malcolm Minnick, Richard Giessler, Dwayne Westermann,
            Bob Ward, Wynemah Hinlicky co-pastoring with William Weicker, and David Drebes.
          </p>
          <p>
            Today’s congregational life features an active youth program headed by Faith Formation Director Kellie Rice,
            frequent cooperative ministries with Salem Presbyterian and St. Paul Episcopal, hands-on Habitat house
            construction, and a liturgically based service with weekly Communion, backed up by a music program headed by
            Susan Short among other ministries.  Several young members are preparing for Christian vocations.  One unusual
            resource is the number of retired clergy who are members and the strong presence of people with ties to
            Roanoke College.  It is not just seven, anymore.
          </p>
        </div>
        <ELCALogo />
      </div>
    </div>
  );
};

export default HistoryContent;
