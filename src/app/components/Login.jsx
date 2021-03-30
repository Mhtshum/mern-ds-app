import React from 'react';
import { connect } from 'react-redux';

const LoginComponent = () => <div> 
      <div>asSalam o alaikm</div>
      <div>alHmdulilah</div>
    </div>


const mapStateToProps = state => state;

export const ConnectedLogin = connect(mapStateToProps)(LoginComponent);