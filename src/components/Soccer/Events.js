import React from 'react'
import { useEvents, useStatsBombData } from '../../store'

const Events = () => {
    const teams = useStatsBombData((state) => state.teams)
    const events = useEvents((state) => state.events)
    return (
        <div style={{
            width: '100%',
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                <div>Argentina</div>
                <div style={{ margin: '0 10px' }}>vs</div>
                <div>Mexico</div>
            </div>
            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    border: '1px solid black',
                }}
            >
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Team</th>
                        <th>Player</th>
                        <th>Minute</th>
                        <th>Second</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={index}>
                            <td>{event.type}</td>
                            <td>{event.team}</td>
                            <td>{event.player}</td>
                            <td>{event.minute}</td>
                            <td>{event.second}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}


export default Events