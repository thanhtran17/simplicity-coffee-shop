import React from 'react';
import MemberCard from '../../components/common/MemberCard';
import { Col, Row } from 'antd';
import avatar1 from '../../assets/avatar1.jpg';
import avatar2 from '../../assets/avatar2.jpg';
import avatar3 from '../../assets/avatar3.jpg';
import avatar4 from '../../assets/avatar4.jpg';

const About = () => {
  const members = [
    {
      fullname: 'Tran Phuc Thanh',
      id: '20194846',
      avatar: avatar1,
      role: 'Leader',
    },
    {
      fullname: 'Dinh Ngoc Khue',
      id: '20194782',
      avatar: avatar2,
      role: 'Member',
    },
    {
      fullname: 'Le Dinh Huy',
      id: '20194776',
      avatar: avatar4,
      role: 'Member',
    },
    {
      fullname: 'Mai Anh Duc',
      id: '20194740',
      avatar: avatar3,
      role: 'Member',
    },
  ];
  return (
    <div>
      <Row>
        {members.map((member) => (
          <Col xl={12} span={24}>
            <MemberCard
              name={member.fullname}
              id={member.id}
              src={member.avatar}
              role={member.role}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default About;
