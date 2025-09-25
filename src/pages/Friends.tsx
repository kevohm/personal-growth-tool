import { useEffect, useState } from "react";
import { db } from "../db";
import { useLiveQuery } from "dexie-react-hooks";

export function AddFriendForm({ defaultAge=21 }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(defaultAge);
  const [status, setStatus] = useState('');
  const friends = useLiveQuery(() => db.friends.toArray());
  async function addFriend() {
    try {
      // Add the new friend!
      const id = await db.friends.add({
        name,
        age
      });

      setStatus(`Friend ${name} successfully added. Got id ${id}`);
      setName('');
      setAge(defaultAge);
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}`);
    }
  }

  return (
    <div>
      <p>{status}</p>
      Name:
      <input
        type="text"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      Age:
      <input
        type="number"
        value={age}
        onChange={(ev) => setAge(Number(ev.target.value))}
      />
      <button onClick={addFriend}>Add</button>
    </div>
  );
}