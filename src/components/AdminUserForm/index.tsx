import React from 'react';
import type { AdminDashboard } from '../../containers/AdminDashboard';

type PageProps = {comp:AdminDashboard};
const AdminUserForm = ({ comp }:PageProps): JSX.Element => {
  const { formError } = comp.state;
  return (
    <div
      className="material-content elevation3"
      style={{ maxWidth: '320px', margin: '30px auto', padding: '10px 10px 20px 10px' }}
    >
      <h4 className="material-header-h4">
        Add Admin User
      </h4>
      <form
        id="modify-admins"
        style={{
          textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
        }}
      >
        <label htmlFor="addAdminEmail">
          Admin Email
          <input
            id="addAdminEmail"
            type="email"
            placeholder="placeholder@gmail.com"
            onChange={comp.onChangeAdminEmail}
          />
        </label>
        <input type="submit" disabled={comp.controller.validateAdmin()} onClick={comp.controller.addAdminUser} />
        <p className="form-errors" style={{ color: 'red', marginBottom: '-15px' }}>{formError}</p>
      </form>
    </div>
  );
};

export default AdminUserForm;
