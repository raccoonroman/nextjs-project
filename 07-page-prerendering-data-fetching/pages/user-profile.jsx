export default function UserProfilePage({ userName }) {
  return (
    <>
      <h1>User Profile</h1>
      <p>This is the user profile page.</p>
      <p>User Name: {userName}</p>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { params, req, res } = context;
  return {
    props: {
      userName: 'John Doe',
    }, // You can fetch data here and pass it as props
  };
};
