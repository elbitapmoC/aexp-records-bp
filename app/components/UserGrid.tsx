const UserGrid = ({ savedUsers, removeProfile }) => {
  return (
    <>
      {savedUsers.map(({ id, email, first_name, last_name, avatar }) => (
        <article key={id} className="grid border items-center gap-4 mt-12">
          <aside>
            <p>{`${first_name} ${last_name}`}</p>
            <address>
              <a href={email}>{email}</a>
            </address>
            <button
              className="mt-12"
              type="button"
              onClick={() => removeProfile(id)}
            >
              Delete
            </button>
          </aside>
          <img className="w-full" src={avatar} alt={`${first_name} avatar`} />
        </article>
      ))}
    </>
  );
};

export default UserGrid;
