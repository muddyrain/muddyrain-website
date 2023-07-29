'use client';
import { FC } from 'react';
import styles from './index.module.css';
export const Loading: FC<{ color?: string }> = ({ color = '#333333' }) => {
  return (
    <div className='w-12 h-12'>
      <div
        className={`w-4 h-4 float-left ${styles.cube_item}`}
        style={{
          animationDelay: '0s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`w-4 h-4 float-left ${styles.cube_item}`}
        style={{
          animationDelay: '0.1s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`w-4 h-4 float-left ${styles.cube_item}`}
        style={{
          animationDelay: '0.2s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`w-4 h-4 float-left ${styles.cube_item}`}
        style={{
          animationDelay: '-0.1s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`w-4 h-4 float-left ${styles.cube_item}`}
        style={{
          animationDelay: '0s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`w-4 h-4 float-left ${styles.cube_item}`}
        style={{
          animationDelay: '0.1s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`w-4 h-4 float-left ${styles.cube_item}`}
        style={{
          animationDelay: '-0.2s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`w-4 h-4 float-left ${styles.cube_item}`}
        style={{
          animationDelay: '-0.1s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`w-4 h-4 float-left ${styles.cube_item}`}
        style={{
          animationDelay: '0s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
};
