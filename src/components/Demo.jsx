import React, { useState } from 'react'
import { Menu, X, Bell, Search, Settings, User, ChevronDown, DollarSign, TrendingUp, PieChart, CreditCard } from 'lucide-react'

const Demo = () => {

  const headerStyle = {
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #7c3aed 100%)',
    padding: '0',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    position: 'relative',
    zIndex: '1000'
  }

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  }

    const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
    cursor: 'pointer'
  }

  const logoIconStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '8px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        {/* Logo */}
        <div style={logoStyle}>
          <div style={logoIconStyle}>
            <DollarSign size={20} />
          </div>
          <span>FineTrack</span>
        </div>
      </div>
    </header>
  )
}

export default Demo