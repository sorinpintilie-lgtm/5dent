if (-not (Test-Path "dist")) {
    New-Item -ItemType Directory -Path "dist" -Force | Out-Null
}

# Copy all necessary files to dist directory
$files = @("*.html", "*.css", "*.js", "*.json", "*.png", "*.jpg", "*.mp4", "*.svg")
foreach ($filePattern in $files) {
    Get-ChildItem -Path $filePattern -ErrorAction SilentlyContinue | ForEach-Object {
        Copy-Item -Path $_.FullName -Destination "dist" -Force
    }
}

Write-Host "Build completed successfully!"
Write-Host "Output directory: $(Resolve-Path dist)"