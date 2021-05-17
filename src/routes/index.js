import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import Student from '../pages/Student';
import Students from '../pages/Students';
import Picture from '../pages/Picture';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Confirmation from '../pages/Confirmation';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Students} isClosed />
      <MyRoute exact path="/student/:id/edit" component={Student} isClosed />
      <MyRoute exact path="/student/" component={Student} isClosed />
      <MyRoute exact path="/pictures/:id" component={Picture} isClosed />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute
        exact
        path="/confirmation/"
        component={Confirmation}
        isClosed={false}
      />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
