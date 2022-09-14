package com.prospection.drools;

public class Rule1Fact {

  public Integer processors;
  public Integer memory;
  public Integer disk_space;
  public Result result;

  public static class Result {

    public Boolean is_passed;
    public String reason;

  }

}
