
Pod::Spec.new do |s|
  s.name         = "RNReactNativeAppRater"
  s.version      = "1.0.0"
  s.summary      = "RNReactNativeAppRater"
  s.description  = <<-DESC
                  RNReactNativeAppRater
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNReactNativeAppRater.git", :tag => "master" }
  s.source_files  = "RNReactNativeAppRater/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  