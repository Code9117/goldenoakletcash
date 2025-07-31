/*
 * @Author: bobo 18077592212@163.com
 * @Date: 2025-07-27 12:48:45
 * @LastEditors: bobo 18077592212@163.com
 * @LastEditTime: 2025-07-27 15:23:35
 * @FilePath: /clothing-h5-project/src/ClothingList.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import type { FC } from 'react';
import './ClothingList.css';
import { Dialog, TextField, Button, Box, Typography, DialogTitle, DialogContent, Slide } from '@mui/material';

// Define clothing data type
interface ClothingItemProps {
  id: number;
  image: string;
  name: string;
  price: number;
}

// Single clothing item component
const ClothingItem: React.FC<ClothingItemProps & { onClick: () => void }> = ({ id, image, name, price, onClick }) => {
  return (
    <div className="clothing-item" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="clothing-image">
        <img src={image} alt={name} />
      </div>
      <div className="clothing-info">
        <h3 className="clothing-name">{name}</h3>
        <p className="clothing-price">K{price}</p>
      </div>
    </div>
  );
};

// Clothing list component
const ClothingList: React.FC = () => {
  // State for form dialog
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ClothingItemProps | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });

  // Handle clothing item click
  const handleItemClick = (item: ClothingItemProps) => {
    setSelectedItem(item);
    setOpen(true);
  };

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = () => {
    // Validate required fields
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }
    
    if (!formData.phone.trim()) {
      alert('Phone number is required');
      return;
    }
    
    console.log('Form submitted:', formData);
    // Here you can add your form submission logic
    setOpen(false);
    // Reset form data
    setFormData({
      name: '',
      phone: '',
      address: '',
      note: ''
    });
  };

  // Mock clothing data
  const clothingData: ClothingItemProps[] = [
    {
      id: 1,
      image: 'https://via.placeholder.com/300x400?text=Clothing+1',
      name: 'Fashion T-Shirt',
      price: 99
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/300x400?text=Clothing+2',
      name: 'Casual Jeans',
      price: 199
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/300x400?text=Clothing+3',
      name: 'Sports Jacket',
      price: 299
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/300x400?text=Clothing+4',
      name: 'Comfortable Sweatshirt',
      price: 159
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/300x400?text=Clothing+5',
      name: 'Elegant Dress',
      price: 259
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/300x400?text=Clothing+6',
      name: 'Formal shirt',
      price: 179
    },
    {
      id: 7,
      image: 'https://via.placeholder.com/300x400?text=Clothing+7',
      name: 'Winter coat',
      price: 399
    },
    {
      id: 8,
      image: 'https://via.placeholder.com/300x400?text=Clothing+8',
      name: 'Summer hat',
      price: 79
    },
    {
      id: 9,
      image: 'https://via.placeholder.com/300x400?text=Clothing+9',
      name: 'Running shoes',
      price: 349
    },
    {
      id: 10,
      image: 'https://via.placeholder.com/300x400?text=Clothing+10',
      name: 'Leather bag',
      price: 499
    },
    {
      id: 11,
      image: 'https://via.placeholder.com/300x400?text=Clothing+11',
      name: 'Sunglasses',
      price: 129
    },
    {
      id: 12,
      image: 'https://via.placeholder.com/300x400?text=Clothing+12',
      name: 'Woolen scarf',
      price: 89
    }
  ];

  return (
    <div className="clothing-list">
      {clothingData.map(item => (
        <ClothingItem
          key={item.id}
          id={item.id}
          image={item.image}
          name={item.name}
          price={item.price}
          onClick={() => handleItemClick(item)}
        />
      ))}

      {/* Form Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
        PaperProps={{
          style: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            maxHeight: '80vh',
            overflow: 'auto',
            borderRadius: '16px 16px 0 0',
            padding: '16px',
            boxSizing: 'border-box'
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h6">Order {selectedItem?.name}</Typography>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box component="form" sx={{ mt: 2, width: '100%', maxWidth: '500px' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              InputProps={{
                startAdornment: <span>+260 </span>,
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="note"
              label="Note (Optional)"
              name="note"
              multiline
              rows={4}
              value={formData.note}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClothingList;