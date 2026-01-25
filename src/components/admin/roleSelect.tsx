'use client';

import { updateUserRole } from '@/lib/team';
import { useState, useTransition } from 'react';
import styles from '@/styles/adminTeam.module.css';

interface RoleSelectProps {
  userId: string;
  currentRole: string;
  isSelf: boolean;
}

export default function RoleSelect({ userId, currentRole, isSelf }: RoleSelectProps) {
  const [role, setRole] = useState(currentRole);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setRole(newRole); // Optimistic update

    startTransition(async () => {
      try {
        await updateUserRole(userId, newRole);
      } catch (err) {
        alert('Failed to update role. You might not have permission.');
        setRole(currentRole); // Revert on error
      }
    });
  };

  if (isSelf) {
    return <span className={styles.readOnlyRole}>{currentRole.replace('_', ' ')}</span>;
  }

  return (
    <div className={styles.selectWrapper}>
      <select 
        value={role} 
        onChange={handleChange} 
        disabled={isPending}
        className={`${styles.roleSelect} ${styles[role]}`}
      >
        <option value="super_admin">Super Admin</option>
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
      </select>
      {isPending && <span className={styles.spinner} />}
    </div>
  );
}