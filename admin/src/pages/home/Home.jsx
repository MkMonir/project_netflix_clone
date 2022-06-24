import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.css';
import { userData } from '../../dummyData';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';

export default function Home() {
  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/v1/users/stats`, {
          headers: {
            token: JSON.parse(localStorage.getItem('user')).token,
            'Content-Type': 'application/json',
          },
        });

        res.data.data
          .sort((a, b) => a._id - b._id)
          .map((item) =>
            setUserStats((prev) => [
              ...prev,
              { name: MONTHS[item._id - 1], 'New User': item.total },
            ])
          );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
