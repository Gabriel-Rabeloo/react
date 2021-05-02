import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import Student from '../pages/Student';
import Students from '../pages/Students';
import Picture from '../pages/Picture';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Students} isCLosed={false} />
      <MyRoute exact path="/student/:id/edit" component={Student} isCLosed />
      <MyRoute exact path="/student/" component={Student} isCLosed />
      <MyRoute exact path="/pictures/:id" component={Picture} isCLosed />
      <MyRoute exact path="/login/" component={Login} isCLosed={false} />
      <MyRoute exact path="/register/" component={Register} isCLosed={false} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
