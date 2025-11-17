# 10 Essential Linux Commands

This document provides detailed explanations and usage examples for 10 commonly used Linux commands.

---

## 1. `ls` - List Directory Contents

**What it does:** Displays the contents of a directory, including files and subdirectories.

**Usage examples:**
```bash
# List files in current directory
ls

# List files with details (long format)
ls -l

# List all files including hidden ones
ls -a

# List files with human-readable sizes
ls -lh

# List files sorted by modification time
ls -lt

# List files in a specific directory
ls /home/user/documents
```

---

## 2. `cd` - Change Directory

**What it does:** Changes the current working directory to the specified path.

**Usage examples:**
```bash
# Change to home directory
cd ~
# or simply
cd

# Change to parent directory
cd ..

# Change to a specific directory
cd /var/log

# Change to a relative path
cd documents/projects

# Go back to previous directory
cd -
```

---

## 3. `pwd` - Print Working Directory

**What it does:** Displays the full path of the current working directory.

**Usage examples:**
```bash
# Show current directory path
pwd

# Show current directory path (alternative)
pwd -P  # Shows physical path, resolving symbolic links
```

---

## 4. `grep` - Global Regular Expression Print

**What it does:** Searches for patterns in files or input streams and displays matching lines.

**Usage examples:**
```bash
# Search for a pattern in a file
grep "error" logfile.txt

# Case-insensitive search
grep -i "ERROR" logfile.txt

# Search recursively in directories
grep -r "pattern" /path/to/directory

# Show line numbers with matches
grep -n "pattern" file.txt

# Invert match (show lines that don't match)
grep -v "pattern" file.txt

# Count number of matches
grep -c "pattern" file.txt

# Search for multiple patterns
grep -E "pattern1|pattern2" file.txt
```

---

## 5. `find` - Search for Files and Directories

**What it does:** Searches for files and directories in a directory hierarchy based on various criteria.

**Usage examples:**
```bash
# Find files by name in current directory
find . -name "*.txt"

# Find files by name (case-insensitive)
find . -iname "*.TXT"

# Find directories only
find . -type d -name "project*"

# Find files modified in last 7 days
find . -mtime -7

# Find files larger than 100MB
find . -size +100M

# Find and execute command on results
find . -name "*.log" -exec rm {} \;

# Find files by permissions
find . -perm 644
```

---

## 6. `chmod` - Change File Permissions

**What it does:** Changes the permissions (read, write, execute) of files and directories.

**Usage examples:**
```bash
# Give execute permission to owner
chmod +x script.sh

# Remove write permission for group and others
chmod go-w file.txt

# Set permissions using octal notation (755 = rwxr-xr-x)
chmod 755 script.sh

# Set permissions using symbolic notation
chmod u=rwx,g=rx,o=r file.txt

# Recursively change permissions
chmod -R 755 directory/

# Add execute permission for all
chmod a+x file.sh
```

---

## 7. `ps` - Process Status

**What it does:** Displays information about currently running processes.

**Usage examples:**
```bash
# Show processes for current user
ps

# Show all processes
ps aux

# Show processes in tree format
ps auxf

# Show processes with custom format
ps -eo pid,ppid,cmd,%mem,%cpu

# Search for specific process
ps aux | grep nginx

# Show processes for a specific user
ps -u username
```


---

## 8. `tar` - Archive Files

**What it does:** Creates, extracts, and manipulates archive files (tar archives).

**Usage examples:**
```bash
# Create a tar archive
tar -cf archive.tar file1 file2 file3

# Create a compressed tar archive (gzip)
tar -czf archive.tar.gz directory/

# Extract a tar archive
tar -xf archive.tar

# Extract a compressed tar archive
tar -xzf archive.tar.gz

# List contents of archive without extracting
tar -tzf archive.tar.gz

# Extract to specific directory
tar -xzf archive.tar.gz -C /path/to/destination

# Create archive with verbose output
tar -czvf archive.tar.gz directory/
```

---

## 9. `df` - Disk Filesystem

**What it does:** Displays information about disk space usage on filesystems.

**Usage examples:**
```bash
# Show disk space usage
df

# Show disk space in human-readable format
df -h

# Show disk space in megabytes
df -m

# Show filesystem type
df -T

# Show only specific filesystem
df -h /dev/sda1

# Show inode usage
df -i
```

---

## 10. `history` - Command History

**What it does:** Displays the command history list or manipulates the history file.

**Usage examples:**
```bash
# Show all command history
history

# Show last 10 commands
history 10

# Search history for a command
history | grep "mkdir"

# Execute a command from history by number
!42

# Execute last command
!!

# Execute last command starting with specific text
!ls

# Clear history
history -c

# Write current history to file
history -w history_backup.txt
```

---

## Summary

These 10 commands are essential for daily Linux operations:

- **`ls`** - Navigate and view directory contents
- **`cd`** - Move between directories
- **`pwd`** - Know your current location
- **`grep`** - Search and filter text
- **`find`** - Locate files and directories
- **`chmod`** - Manage file permissions
- **`ps`** - Monitor running processes
- **`tar`** - Create and extract archives
- **`df`** - Check disk space
- **`history`** - Access command history

Mastering these commands will significantly improve your efficiency when working with Linux systems.

