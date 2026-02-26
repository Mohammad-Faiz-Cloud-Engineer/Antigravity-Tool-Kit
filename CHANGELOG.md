# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-02-26

### Added
- Production-grade error handling across all modules
- Comprehensive input validation for CLI arguments
- Strict mode enabled in all JavaScript files
- Enhanced test suite with additional validation checks
- Better error messages with helpful hints
- Module exports for testability
- .gitignore and .npmignore files
- CHANGELOG.md for version tracking

### Changed
- Improved code structure with constants for magic strings
- Enhanced validation scripts with detailed error reporting
- Better cleanup of temporary directories
- Optimized file reading with proper error handling
- Improved logging with consistent color usage

### Fixed
- Path validation to prevent invalid directory operations
- Proper cleanup of temporary files on errors
- Color function safety checks
- Missing error handling in file operations

### Security
- Added path validation to prevent directory traversal
- Improved input sanitization for CLI arguments
- Better handling of file system permissions

## [2.0.0] - 2026-01-15

### Added
- 16 specialist AI agents
- 40 domain-specific skills
- 11 workflows for common tasks
- CLI tool with multiple commands
- Comprehensive documentation

### Changed
- Complete rewrite of the toolkit architecture
- Improved installation process

## [1.0.0] - 2025-12-01

### Added
- Initial release
- Basic agent templates
- Core functionality
