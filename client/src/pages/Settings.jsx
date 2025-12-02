import React, { useState } from 'react'
import Card from '../components/Card'
import '../styles/Settings.css'

const Settings = () => {
  return (
    <div className="settings">
      <h2 className="page-heading">Settings</h2>
      
      <Card title="Profile Settings">
        <ProfileSettings />
      </Card>

      <Card title="Preferences">
        <PreferencesSettings />
      </Card>

      <Card title="Notifications">
        <NotificationSettings />
      </Card>

      <Card title="Security">
        <SecuritySettings />
      </Card>
    </div>
  )
}

const ProfileSettings = () => (
  <div className="settings-section">
    <SettingItem label="Username" value="john_doe" />
    <SettingItem label="Email" value="john@example.com" />
    <SettingItem label="Role" value="Administrator" />
    <button className="btn-primary">Edit Profile</button>
  </div>
)

const PreferencesSettings = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('English')

  return (
    <div className="settings-section">
      <ToggleSetting 
        label="Dark Mode" 
        checked={darkMode}
        onChange={setDarkMode}
      />
      <SelectSetting 
        label="Language"
        value={language}
        options={['English', 'Spanish', 'French', 'German']}
        onChange={setLanguage}
      />
    </div>
  )
}

const NotificationSettings = () => {
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)

  return (
    <div className="settings-section">
      <ToggleSetting 
        label="Email Notifications" 
        checked={emailNotif}
        onChange={setEmailNotif}
      />
      <ToggleSetting 
        label="Push Notifications" 
        checked={pushNotif}
        onChange={setPushNotif}
      />
    </div>
  )
}

const SecuritySettings = () => (
  <div className="settings-section">
    <button className="btn-secondary">Change Password</button>
    <button className="btn-secondary">Two-Factor Authentication</button>
    <button className="btn-danger">Delete Account</button>
  </div>
)

const SettingItem = ({ label, value }) => (
  <div className="setting-item">
    <span className="setting-label">{label}:</span>
    <span className="setting-value">{value}</span>
  </div>
)

const ToggleSetting = ({ label, checked, onChange }) => (
  <div className="setting-item">
    <span className="setting-label">{label}</span>
    <label className="toggle-switch">
      <input 
        type="checkbox" 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="toggle-slider"></span>
    </label>
  </div>
)

const SelectSetting = ({ label, value, options, onChange }) => (
  <div className="setting-item">
    <span className="setting-label">{label}</span>
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="setting-select"
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
)

export default Settings
