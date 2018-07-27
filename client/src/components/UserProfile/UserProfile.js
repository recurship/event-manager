import React, { Component } from 'react';
import { AttendeeType } from '../../types/attendee-types';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import './UserProfile.css';

type Props = {
  user: AttendeeType,
};
type InfoGroupProps = {
	name: string,
	value: string
}

const InfoGroup = (e: InfoGroupProps) => {
  return (
    <tr className="info-group">
      <td colSpan="2" className="label capitalize">
        {e.name}
      </td>
      <td className="label bold">{e.value || '-'}</td>
    </tr>
  );
};

const getFullname = (user: AttendeeType) => {
  let name = '';
  if (user.firstName) name += `${user.firstName} `;
  if (user.lastName) name += `${user.lastName} `;

  return name ? name : '-';
};
const UserProfile = (props: Props) => {
  let user = props.user;
  return user ? (
    <div id="user-profile">
      <h4>{user.username || user.email || getFullname(user)}</h4>
      <hr />
      <Row>
        <Col md="4">
          <Card>
            <CardImg
              top
              width="100%"
              src={
                user.avatar ||
                'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'
              }
              alt="User Profile Pic"
            />
          </Card>
        </Col>
        <Col md="8">
          <h4>Attendee</h4>
          <table>
            <tbody>
              <InfoGroup name="name" value={getFullname(user)} />
              <InfoGroup name="user Name" value={user.username} />
              <InfoGroup name="email" value={user.email} />
            </tbody>
          </table>
          <div />
        </Col>
      </Row>
    </div>
  ) : null;
};

export default UserProfile;
