// TodoApp.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(null); // Initialize with null
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Use AsyncStorage or another storage solution for persistence in React Native
    // Example: AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (editIndex !== null) {
      // If editing, update the existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { text: newTask, date: newTaskDate ? newTaskDate.toISOString().split('T')[0] : null };
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // If not editing, add a new task
      setTasks([...tasks, { text: newTask, date: newTaskDate ? newTaskDate.toISOString().split('T')[0] : null }]);
    }

    // Clear the input fields
    setNewTask("");
    setNewTaskDate(null); // Set to null after adding a task
  };

  const editTask = (index) => {
    // Set the input fields with the task to be edited
    setNewTask(tasks[index].text);
    setNewTaskDate(tasks[index].date ? new Date(tasks[index].date) : null);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    // Remove task at the specified index
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    // Reset editIndex if the task being edited is deleted
    if (index === editIndex) {
      setEditIndex(null);
      setNewTask("");
      setNewTaskDate(null); // Set to null after deleting a task
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // Close the date picker on iOS
    if (selectedDate) {
      setNewTaskDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="What do you have planned?"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <TouchableOpacity style={styles.datePickerButton} onPress={showDatepicker}>
          <Text>Date: {newTaskDate ? newTaskDate.toISOString().split('T')[0] : 'Select date'}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={newTaskDate || new Date()} // Set to current date if null
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <Button title={editIndex !== null ? "Save task" : "Add task"} onPress={addTask} />
      </View>
      <ScrollView style={styles.taskList}>
        <Text style={styles.taskListHeader}>Tasks</Text>
        {tasks.map((task, index) => (
          <View key={index} style={styles.task}>
            <View style={styles.content}>
              <Text style={styles.text}>{task.text}</Text>
              {task.date && <Text style={styles.date}>Date: {task.date}</Text>}
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.editButton} onPress={() => editTask(index)}>
                <Text>{editIndex === index ? "Cancel" : "Edit"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(index)}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  form: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  datePickerButton: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  taskList: {
    flex: 1,
  },
  taskListHeader: {
    fontSize: 20,
    marginBottom: 8,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 18,
  },
  date: {
    fontSize: 16,
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 8,
    backgroundColor: '#7c8fc2',
    
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#ed4572',
    borderRadius: 4,
  },
});

export default TodoApp;
