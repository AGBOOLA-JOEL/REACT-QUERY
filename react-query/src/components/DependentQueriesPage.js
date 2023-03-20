//  QUERIES DEPENDENT ON THE RESULT OF ANOTHER QUERY
 
import axios from "axios";
import { useQuery } from "react-query";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchUserByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export default function DependentQueriesPage({ email }) {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );

  const channelId = user?.data.channelId;

  const courseList = useQuery(
    ["courses", channelId],
    () => fetchUserByChannelId(channelId),
    {
      enabled: !!channelId, // fetch channelId only when channel details has been retrieved
    }
  );

  console.log(courseList?.data);
  return <div>learn how to map it out</div>;  
}
