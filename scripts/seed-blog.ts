import { db } from '../src/lib/db/schema';
import { blogPosts } from '../src/lib/db/schema';

async function seedBlog() {
  try {
    const wingetPost = {
      title: "Getting Started with Windows Package Manager (winget)",
      slug: "getting-started-with-winget",
      excerpt: "Learn how to use Windows Package Manager (winget) to install and manage software packages on Windows 10 and 11.",
      content: `# Getting Started with Windows Package Manager (winget)

Windows Package Manager (winget) is a command-line tool that allows you to install, update, and manage software packages on Windows 10 and 11. It's similar to package managers like apt on Linux or Homebrew on macOS.

## Installation

winget comes pre-installed on Windows 11 and recent versions of Windows 10. To check if you have it installed, open PowerShell or Command Prompt and run:

\`\`\`powershell
winget --version
\`\`\`

If it's not installed, you can get it from the Microsoft Store by searching for "App Installer".

## Basic Usage

### Installing Software

To install software, use the following command:

\`\`\`powershell
winget install <package-name>
\`\`\`

For example, to install Visual Studio Code:

\`\`\`powershell
winget install Microsoft.VisualStudioCode
\`\`\`

### Updating Software

To update all installed packages:

\`\`\`powershell
winget upgrade --all
\`\`\`

To update a specific package:

\`\`\`powershell
winget upgrade <package-name>
\`\`\`

### Searching for Packages

To search for available packages:

\`\`\`powershell
winget search <search-term>
\`\`\`

For example, to search for Python:

\`\`\`powershell
winget search python
\`\`\`

### Removing Software

To uninstall a package:

\`\`\`powershell
winget uninstall <package-name>
\`\`\`

## Advanced Features

### Installing Specific Versions

You can install a specific version of a package:

\`\`\`powershell
winget install <package-name> --version <version>
\`\`\`

### Installing from a Specific Source

Some packages are available from multiple sources. You can specify the source:

\`\`\`powershell
winget install <package-name> --source <source-name>
\`\`\`

### Exporting and Importing Package Lists

To export a list of installed packages:

\`\`\`powershell
winget export -o packages.json
\`\`\`

To install packages from a list:

\`\`\`powershell
winget import -i packages.json
\`\`\`

## Tips and Tricks

1. Use \`--accept-source-agreements\` to automatically accept source agreements
2. Use \`--accept-package-agreements\` to automatically accept package agreements
3. Use \`--silent\` for unattended installations
4. Use \`--help\` to see all available options for any command

## Common Issues and Solutions

### Package Not Found

If a package is not found, try:
1. Checking the exact package name using \`winget search\`
2. Verifying you're using the correct source
3. Updating winget to the latest version

### Installation Failures

If installation fails:
1. Run PowerShell as Administrator
2. Check your internet connection
3. Verify you have enough disk space
4. Check the winget logs for detailed error messages

## Conclusion

winget is a powerful tool for managing software on Windows. It simplifies the process of installing, updating, and removing software packages. With its command-line interface and extensive package repository, it's becoming an essential tool for Windows users and developers.

For more information, visit the [official winget documentation](https://docs.microsoft.com/en-us/windows/package-manager/winget/).`
    };

    const post = await db.insert(blogPosts).values(wingetPost).returning();
    console.log('Blog post created successfully:', post[0]);
  } catch (error) {
    console.error('Error seeding blog post:', error);
  }
}

seedBlog(); 