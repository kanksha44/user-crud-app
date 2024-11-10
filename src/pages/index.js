import { useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("User created successfully!");
      setFormData({ name: "", email: "" });
    } else {
      alert("Failed to create user");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create a New User</h1>
      <Link href="/users">
        <button>Go to Users</button>
      </Link>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.button}>
          Create
        </button>
      </form>
    </div>
  );
}
